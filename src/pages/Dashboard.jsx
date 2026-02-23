import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  getChatUnreadCount,
  listConversations,
  listMessages,
  listNutritionists,
  markChatRead,
  sendMessage,
  startConversation,
  uploadChatAttachment,
} from "../lib/chatApi";
import { connectChat, disconnectChat, emitTyping } from "../lib/chatSocket";

const USER_KEY = "maya_auth_user";
const TOKEN_KEY = "maya_auth_token";
const LEGACY_TOKEN_KEY = "maya_admin_token";

function readToken() {
  return localStorage.getItem(TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY) || "";
}

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}

function Dashboard() {
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(() => readToken());
  const [nutritionists, setNutritionists] = React.useState([]);
  const [conversations, setConversations] = React.useState([]);
  const [activeConversation, setActiveConversation] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [chatInput, setChatInput] = React.useState("");
  const [chatStatus, setChatStatus] = React.useState(null);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [typingStatus, setTypingStatus] = React.useState("");
  const [uploading, setUploading] = React.useState(false);
  const [attachments, setAttachments] = React.useState([]);
  const fileInputRef = React.useRef(null);
  const typingTimer = React.useRef(null);
  const location = useLocation();
  const chatOnly = location.hash === "#chat";

  React.useEffect(() => {
    const raw = localStorage.getItem(USER_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    setUser(parsed);
    setToken(readToken());
  }, []);

  const userId = user?._id || parseJwt(token)?.sub || "";
  const getOtherParticipant = React.useCallback(
    (conversation) => {
      const participants = conversation?.participants || [];
      const other = participants.find((participant) => {
        const id = typeof participant === "object" ? participant._id : participant;
        return String(id) !== String(userId);
      });
      return typeof other === "object" ? other : null;
    },
    [userId]
  );

  React.useEffect(() => {
    if (!token || !userId) return;

    connectChat(userId);
    return () => {
      disconnectChat();
    };
  }, [token, userId]);

  React.useEffect(() => {
    if (!token) return;
    listNutritionists(token)
      .then((data) => setNutritionists(data || []))
      .catch(() => {});
  }, [token]);

  const refreshConversations = React.useCallback(() => {
    if (!token) return;
    listConversations(token)
      .then((data) => setConversations(data || []))
      .catch(() => {});
  }, [token]);

  React.useEffect(() => {
    refreshConversations();
  }, [refreshConversations]);

  React.useEffect(() => {
    if (!token) return;
    getChatUnreadCount(token)
      .then((data) => setUnreadCount(Number(data?.unread || 0)))
      .catch(() => {});
  }, [token, conversations.length, messages.length]);

  React.useEffect(() => {
    if (!token || !activeConversation?._id) return;
    listMessages(activeConversation._id, token)
      .then((data) => setMessages((data || []).slice().reverse()))
      .catch(() => setMessages([]));
    markChatRead(activeConversation._id, token).catch(() => {});
  }, [activeConversation, token]);

  React.useEffect(() => {
    const handleMessage = (event) => {
      const payload = event?.detail;
      if (!payload) return;

      if (payload.conversation_id === activeConversation?._id) {
        setMessages((prev) => [...prev, payload]);
        markChatRead(payload.conversation_id, token).catch(() => {});
      } else {
        refreshConversations();
      }
    };

    const handleTyping = (event) => {
      const payload = event?.detail;
      if (!payload) return;
      if (payload.conversation_id !== activeConversation?._id) return;
      setTypingStatus("Typing...");
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => setTypingStatus(""), 1500);
    };

    window.addEventListener("maya-chat-message", handleMessage);
    window.addEventListener("maya-chat-typing", handleTyping);
    return () => {
      window.removeEventListener("maya-chat-message", handleMessage);
      window.removeEventListener("maya-chat-typing", handleTyping);
    };
  }, [activeConversation, refreshConversations, token]);

  const handleStartConversation = async (nutritionistId) => {
    if (!token) return;
    try {
      const convo = await startConversation(nutritionistId, token);
      setActiveConversation(convo);
      refreshConversations();
    } catch (error) {
      setChatStatus("Could not start a conversation.");
    }
  };

  const handleSendMessage = async () => {
    if (!token || !activeConversation?._id) return;
    if (!chatInput.trim() && attachments.length === 0) return;

    const receiverId =
      getOtherParticipant(activeConversation)?._id ||
      activeConversation.participants?.find((id) => String(id) !== String(userId)) ||
      activeConversation.receiver_id;

    if (!receiverId) return;
    try {
      const created = await sendMessage(
        {
          conversation_id: activeConversation._id,
          receiver_id: receiverId,
          body: chatInput.trim(),
          attachments,
        },
        token
      );
      setMessages((prev) => [...prev, created]);
      setChatInput("");
      setAttachments([]);
      refreshConversations();
    } catch (error) {
      setChatStatus("Could not send message.");
    }
  };

  const handleTyping = () => {
    if (!activeConversation?._id) return;
    const receiverId =
      getOtherParticipant(activeConversation)?._id ||
      activeConversation.participants?.find((id) => String(id) !== String(userId)) ||
      activeConversation.receiver_id;
    if (!receiverId) return;
    emitTyping({
      conversation_id: activeConversation._id,
      receiver_id: receiverId,
      sender_id: userId,
    });
  };

  const handleAttachmentPick = async (event) => {
    if (!token) return;
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setUploading(true);
    try {
      const uploaded = [];
      for (const file of files) {
        const data = await uploadChatAttachment(file, token);
        uploaded.push(data);
      }
      setAttachments((prev) => [...prev, ...uploaded]);
    } catch (error) {
      setChatStatus("Could not upload attachment.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      {!chatOnly && (
        <div className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "Today’s Plan", value: "Balanced", hint: "560 kcal target" },
          { label: "Hydration", value: "4 / 8 cups", hint: "Stay steady" },
          { label: "Streak", value: "6 days", hint: "Consistency wins" },
        ].map((card) => (
          <div key={card.label} className="rounded-3xl bg-white/95 p-6 shadow-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">{card.label}</p>
            <p className="mt-4 font-display text-3xl text-ink">{card.value}</p>
            <p className="mt-2 text-xs text-muted">{card.hint}</p>
          </div>
        ))}
        </div>
      )}

      {!chatOnly && (
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Profile Brief</p>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>Name: {user?.name || "Maya Member"}</p>
            <p>Email: {user?.email || "Signed-in user"}</p>
            <p>Goal: Maintain energy and balance</p>
            <p>Plan: Plant-forward, high-protein mix</p>
          </div>
          <Link
            to="/profile"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Edit profile -
          </Link>
        </div>

        <div className="rounded-3xl bg-ink p-6 text-cream shadow-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-cream/70">Recent Activity</p>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li>Checked in after lunch.</li>
            <li>Saved a new breakfast ritual.</li>
            <li>Completed 10-minute reset.</li>
          </ul>
          <Link
            to="/activity"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2 text-sm font-semibold text-ink"
          >
            View activity -
          </Link>
        </div>
        </div>
      )}

      {!chatOnly && (
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Meal Plan</p>
          <p className="mt-3 text-sm text-muted">
            A gentle 7-day plan tailored to your energy needs.
          </p>
          <Link
            to="/meal-plan"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Open plan -
          </Link>
        </div>
        <div className="rounded-3xl bg-white/95 p-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Account</p>
          <p className="mt-3 text-sm text-muted">
            Manage your plan, preferences, and notifications.
          </p>
          <Link
            to="/account"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/80 px-5 py-2 text-sm font-semibold text-ink shadow-soft"
          >
            Account settings -
          </Link>
        </div>
        </div>
      )}

      <div
        id="chat"
        className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="rounded-3xl bg-white/95 shadow-lg">
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Chats</p>
            <span className="rounded-full bg-ink/10 px-3 py-1 text-xs text-ink">
              Unread: {unreadCount}
            </span>
          </div>

          <div className="px-5 py-4">
            <input
              placeholder="Search nutritionists"
              className="w-full rounded-2xl border border-ink/10 bg-cream/40 px-4 py-2.5 text-sm"
            />
          </div>

          <div className="border-b border-ink/10 px-5 pb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Start a chat
            </p>
            <div className="mt-3 space-y-2">
              {nutritionists.length === 0 && (
                <p className="text-sm text-muted">No nutritionists available.</p>
              )}
              {nutritionists.map((nutritionist) => (
                <button
                  key={nutritionist._id}
                  type="button"
                  onClick={() => handleStartConversation(nutritionist._id)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-cream/50 px-3 py-2 text-left text-sm transition hover:bg-cream"
                >
                  <div className="h-10 w-10 rounded-full bg-ink/10" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">
                      {nutritionist.name || nutritionist.email}
                    </p>
                    <p className="text-xs text-muted">Tap to start chat</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Recent conversations
            </p>
            <div className="mt-3 space-y-2">
              {conversations.length === 0 && (
                <p className="text-sm text-muted">No conversations yet.</p>
              )}
              {conversations.map((conversation) => {
                const other = getOtherParticipant(conversation);
                const label =
                  other?.name ||
                  other?.email ||
                  `Conversation ${conversation._id?.slice(-4)}`;
                return (
                  <button
                    key={conversation._id}
                    type="button"
                    onClick={() => setActiveConversation(conversation)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition ${
                      activeConversation?._id === conversation._id
                        ? "bg-cream"
                        : "bg-white hover:bg-cream/60"
                    }`}
                  >
                    <div className="h-11 w-11 rounded-full bg-ink/10" />
                    <div className="flex-1">
                      <p className="font-semibold text-ink">{label}</p>
                      <p className="mt-1 text-xs text-muted">
                        {conversation.last_message?.body || "No messages yet"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white/95 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-ink/10" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  Conversation
                </p>
                {activeConversation && (
                  <p className="mt-1 text-sm font-semibold text-ink">
                    {getOtherParticipant(activeConversation)?.name ||
                      getOtherParticipant(activeConversation)?.email ||
                      "Nutritionist"}
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs text-muted">{typingStatus}</span>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto bg-cream/40 px-6 py-4">
            {chatStatus && (
              <p className="text-xs text-red-600">{chatStatus}</p>
            )}
            {messages.length === 0 && (
              <p className="text-sm text-muted">
                Select a conversation to view messages.
              </p>
            )}
            {messages.map((message) => {
              const isMine = String(message.sender_id) === String(userId);
              return (
                <div
                  key={message._id}
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    isMine
                      ? "ml-auto bg-ink text-cream"
                      : "mr-auto bg-white text-ink"
                  }`}
                >
                  {message.body && <p>{message.body}</p>}
                  {message.attachments?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((file) => {
                        const isImage = file.mime?.startsWith("image/");
                        return isImage ? (
                          <img
                            key={file.url}
                            src={file.url}
                            alt={file.name || "attachment"}
                            className="w-48 rounded-xl border border-ink/10 object-cover"
                          />
                        ) : (
                          <a
                            key={file.url}
                            href={file.url}
                            className="text-xs underline"
                          >
                            {file.name || "Attachment"}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {attachments.length > 0 && (
            <div className="border-t border-ink/10 px-6 py-3">
              <div className="flex flex-wrap gap-2">
                {attachments.map((file) => (
                  <span
                    key={file.url}
                    className="rounded-full bg-ink/10 px-3 py-1 text-xs text-ink"
                  >
                    {file.name || "Attachment"}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 border-t border-ink/10 px-6 py-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleAttachmentPick}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink"
            >
              {uploading ? "Uploading..." : "Attach"}
            </button>
            <input
              value={chatInput}
              onChange={(event) => {
                setChatInput(event.target.value);
                handleTyping();
              }}
              placeholder="Write a message..."
              className="flex-1 rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="rounded-2xl bg-ink px-5 py-3 text-sm font-semibold text-cream"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
