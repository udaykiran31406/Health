import React, { useState, useEffect } from "react";
import "./App.css";

/*
  Simple navigation:
  - "login"   -> Login screen
  - "signup"  -> Signup screen
  - "student" -> Student dashboard
  - "admin"   -> Admin dashboard

  Auth rules:
  - Admin: username "admin", password "admin123"
  - Any other user: must be signed up (stored in localStorage "users")
*/

/* ===================== Login Component ===================== */
function Login({ onLogin, error, switchToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username.trim(), password.trim());
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <a
          href="#signup"
          onClick={(e) => {
            e.preventDefault();
            switchToSignup();
          }}
        >
          Create one
        </a>
      </p>

      {error && <div className="error">{error}</div>}
    </div>
  );
}

/* ===================== Signup Component ===================== */
function Signup({ onSignup, message, switchToLogin }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(newUsername.trim(), newPassword.trim());
  };

  return (
    <div className="login-container">
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Choose Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{" "}
        <a
          href="#login"
          onClick={(e) => {
            e.preventDefault();
            switchToLogin();
          }}
        >
          Login here
        </a>
      </p>

      {message && <div className="success">{message}</div>}
    </div>
  );
}

/* ===================== Student Dashboard ===================== */
function StudentDashboard({ onLogout }) {
  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [savedName, setSavedName] = useState("—");
  const [savedEmail, setSavedEmail] = useState("—");
  const [savedAge, setSavedAge] = useState("—");

  // Progress state
  const [mentalProgress, setMentalProgress] = useState(60);
  const [fitnessProgress, setFitnessProgress] = useState(80);
  const [nutritionProgress, setNutritionProgress] = useState(50);

  // Joined programs
  const [joinedPrograms, setJoinedPrograms] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedAge = localStorage.getItem("userAge");
    const storedPrograms =
      JSON.parse(localStorage.getItem("joinedPrograms") || "[]");

    if (storedName) {
      setName(storedName);
      setSavedName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
      setSavedEmail(storedEmail);
    }
    if (storedAge) {
      setAge(storedAge);
      setSavedAge(storedAge);
    }
    if (storedPrograms) {
      setJoinedPrograms(storedPrograms);
    }
  }, []);

  const handleSaveProfile = () => {
    if (!name || !email || !age) {
      alert("⚠️ Please fill out all fields before saving.");
      return;
    }

    setSavedName(name);
    setSavedEmail(email);
    setSavedAge(age);

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userAge", age);

    alert("✅ Profile saved successfully!");
  };

  const handleUpdateProgress = () => {
    // Like your original JS: set all to 100 and labels to 100%
    setMentalProgress(100);
    setFitnessProgress(100);
    setNutritionProgress(100);
    alert("🎉 Progress updated successfully!");
  };

  const handleJoinProgram = (programName) => {
    if (joinedPrograms.includes(programName)) {
      alert("⚠️ You already joined this program!");
      return;
    }
    const updated = [...joinedPrograms, programName];
    setJoinedPrograms(updated);
    localStorage.setItem("joinedPrograms", JSON.stringify(updated));
    alert(`🎉 You have joined the ${programName}!`);
  };

  return (
    <div className="dashboard-container">
      <header>
        <h1>🎓 Student Health &amp; Wellness Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <main>
        {/* Profile Section */}
        <section id="profile">
          <h2>👤 My Profile</h2>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label>Age:</label>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <button id="saveProfile" onClick={handleSaveProfile}>
            Save Profile
          </button>

          {/* Display Saved Info */}
          <div id="savedProfile" className="profile-display">
            <h3>Your Saved Information:</h3>
            <p>
              <strong>Name:</strong> <span id="displayName">{savedName}</span>
            </p>
            <p>
              <strong>Email:</strong> <span id="displayEmail">{savedEmail}</span>
            </p>
            <p>
              <strong>Age:</strong> <span id="displayAge">{savedAge}</span>
            </p>
          </div>
        </section>

        {/* Wellness Progress Section */}
        <section id="progress">
          <h2>📊 My Wellness Progress</h2>
          <p>Track your progress in each wellness area!</p>

          <p>
            Mental Wellness:{" "}
            <progress value={mentalProgress} max="100"></progress>{" "}
            <span id="mentalLabel">{mentalProgress}%</span>
          </p>

          <p>
            Fitness:{" "}
            <progress value={fitnessProgress} max="100"></progress>{" "}
            <span id="fitnessLabel">{fitnessProgress}%</span>
          </p>

          <p>
            Nutrition:{" "}
            <progress value={nutritionProgress} max="100"></progress>{" "}
            <span id="nutritionLabel">{nutritionProgress}%</span>
          </p>

          <button id="updateProgress" onClick={handleUpdateProgress}>
            Update Progress
          </button>
        </section>

        {/* Wellness Programs */}
        <section id="wellness">
          <h2>💪 Wellness Programs</h2>
          <div className="program-list">
            <div className="program-card">
              <h3>🏃 Fitness Challenge</h3>
              <p>Join our 30-day fitness challenge to boost your physical health.</p>
              <button
                className="join-btn"
                onClick={() => handleJoinProgram("Fitness Challenge")}
              >
                {joinedPrograms.includes("Fitness Challenge") ? "Joined" : "Join"}
              </button>
            </div>

            <div className="program-card">
              <h3>🧠 Mindfulness Program</h3>
              <p>
                Daily meditation and breathing exercises to improve mental focus.
              </p>
              <button
                className="join-btn"
                onClick={() => handleJoinProgram("Mindfulness Program")}
              >
                {joinedPrograms.includes("Mindfulness Program") ? "Joined" : "Join"}
              </button>
            </div>

            <div className="program-card">
              <h3>🥗 Nutrition Guide</h3>
              <p>
                Get weekly meal plans and nutrition tips to maintain a balanced diet.
              </p>
              <button
                className="join-btn"
                onClick={() => handleJoinProgram("Nutrition Guide")}
              >
                {joinedPrograms.includes("Nutrition Guide") ? "Joined" : "Join"}
              </button>
            </div>
          </div>

          <div id="joinedPrograms" className="joined-programs">
            <h3>✅ My Joined Programs:</h3>
            <ul id="programList">
              {joinedPrograms.length === 0 && <li>No programs joined yet.</li>}
              {joinedPrograms.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ===================== Admin Dashboard ===================== */
function AdminDashboard({ onLogout }) {
  return (
    <div className="dashboard-container">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>

      <main>
        <h2>Welcome, Admin!</h2>
        <p>
          Manage wellness programs, update health resources, and track student
          engagement here.
        </p>

        <div className="card-container">
          <div className="card">
            <h3>Manage Resources</h3>
            <p>Upload or update health articles, videos, and program links.</p>
          </div>

          <div className="card">
            <h3>View Usage Metrics</h3>
            <p>
              Check how many students accessed mental health, fitness, or
              nutrition resources.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ===================== Main App Component ===================== */
export default function App() {
  const [view, setView] = useState("login");
  const [loginError, setLoginError] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleLogin = (username, password) => {
    setLoginError("");

    if (!username || !password) {
      setLoginError("Please enter username and password.");
      return;
    }

    // Hard-coded admin credentials
    if (username === "admin" && password === "admin123") {
      setView("admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      setLoginError("Invalid username or password.");
      return;
    }

    setView("student");
  };

  const handleSignup = (username, password) => {
    if (!username || !password) {
      setSignupMessage("Please fill out both fields.");
      return;
    }

    if (username === "admin") {
      setSignupMessage('Username "admin" is reserved.');
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const exists = users.some((u) => u.username === username);

    if (exists) {
      setSignupMessage("Username already exists. Please choose another one.");
      return;
    }

    const updatedUsers = [...users, { username, password }];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setSignupMessage("Signup successful! You can login now.");
  };

  const handleLogout = () => {
    setView("login");
  };

  return (
    <div className="app">
      {view === "login" && (
        <Login
          onLogin={handleLogin}
          error={loginError}
          switchToSignup={() => {
            setSignupMessage("");
            setView("signup");
          }}
        />
      )}

      {view === "signup" && (
        <Signup
          onSignup={handleSignup}
          message={signupMessage}
          switchToLogin={() => {
            setLoginError("");
            setView("login");
          }}
        />
      )}

      {view === "student" && <StudentDashboard onLogout={handleLogout} />}

      {view === "admin" && <AdminDashboard onLogout={handleLogout} />}
    </div>
  );
}
