import { useEffect, useState } from "react";
import { base_url } from "../utils/constants.js";

const AboutMe = () => {
    const [hero, setHero] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem("hero_data");

        if (saved) {
            const parsed = JSON.parse(saved);
            const isExpired = Date.now() - parsed.timestamp > 30 * 24 * 60 * 60 * 1000;
            if (!isExpired) {
                setHero(parsed.value);
                return;
            }
        }

        fetch(`${base_url}/v1/peoples/1`)
            .then(res => res.json())
            .then(data => {
                const info = {
                    name: data.name,
                    gender: data.gender,
                    birth_year: data.birth_year,
                    height: data.height,
                    mass: data.mass,
                    hair_color: data.hair_color,
                    skin_color: data.skin_color,
                    eye_color: data.eye_color
                };

                setHero(info);
                localStorage.setItem("hero_data",JSON.stringify({value: info,timestamp: Date.now()}));
            });
    }, []);

    if (!hero) {
        return (
            <p className="far-galaxy">
                <span className="spinner-border-sm spinner-border"></span>
                <span className="spinner-grow spinner-grow-sm">Loading...</span>
            </p>
        );
    }

    return (
        <div className='fs-2 lh-lg text-justify ms-5'>
            <p><span className='display-3'>name:</span> {hero.name}</p>
            <p><span className='display-3'>gender:</span> {hero.gender}</p>
            <p><span className='display-3'>birth year:</span> {hero.birth_year}</p>
            <p><span className='display-3'>height:</span> {hero.height}</p>
            <p><span className='display-3'>mass:</span> {hero.mass}</p>
            <p><span className='display-3'>hair color:</span> {hero.hair_color}</p>
            <p><span className='display-3'>skin color:</span> {hero.skin_color}</p>
            <p><span className='display-3'>eye color:</span> {hero.eye_color}</p>
        </div>
    );
};

export default AboutMe;
