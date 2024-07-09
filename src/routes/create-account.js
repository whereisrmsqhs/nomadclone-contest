import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Link } from "react-router-dom";
import GithubButton from "../components/github-btn";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || name === "" || email === "" || password === "") return;

    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
            name="name"
            value={name}
            placeholder="Name"
            type="text"
            required
          />
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
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Create Account"}
          />
        </form>
        {error !== "" ? <span>{error}</span> : null}
        <span>
          Already have an account? <Link to="/login">Create one &rarr</Link>
        </span>
        <GithubButton />
      </div>
    </>
  );
}
