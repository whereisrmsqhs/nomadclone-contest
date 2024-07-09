import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import GithubButton from "../components/github-btn";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setEmail(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Log into 𝕏</h1>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
          />
          <input
            onChange={onChange}
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            required
          />
          <input type="submit" value={isLoading ? "Loading..." : "Log In"} />
        </form>
        {error !== "" ? <span>{error}</span> : null}
        <span>
          Don't have an account?{" "}
          <Link to="/create-account">Create one &rarr</Link>
        </span>
        <GithubButton />
      </div>
    </>
  );
}
