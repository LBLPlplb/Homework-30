
import { useEffect, useState } from "react";
import { base_url } from "../utils/constants.js";

const Contact = () => {
    const [planets, setPlanets] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        planet: "",
        subject: ""
    });

    useEffect(() => {
        const saved = localStorage.getItem("planets_data");

        if (saved) {
            const parsed = JSON.parse(saved);
            const isExpired = Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000;
            if (!isExpired) {
                setPlanets(parsed.value);
                return;
            }
        }

        fetch(`${base_url}/v1/planets`)
            .then(res => res.json())
            .then(data => {
                const planetNames = data.map(p => p.name);
                setPlanets(planetNames);
                localStorage.setItem(
                    "planets_data",
                    JSON.stringify({ value: planetNames, timestamp: Date.now() })
                );
            });
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        alert("Form submitted! Check console.");
    };

    if (planets.length === 0) {
        return (
            <p className="far-galaxy">
                <span className="spinner-border-sm spinner-border"></span>
                <span className="spinner-grow spinner-grow-sm">Loading...</span>
            </p>
        );
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="contact-container">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="planet">Select Planet:</label>
                <select
                    id="planet"
                    name="planet"
                    value={form.planet}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select planet</option>
                    {planets.map((p, i) => (
                        <option key={i} value={p}>{p}</option>
                    ))}
                </select>

                <label htmlFor="subject">Subject:</label>
                <textarea
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={{ height: "200px" }}
                    required
                />
            </form>
        </div>
    );
};

export default Contact;
