import React, { useState, useRef, useEffect } from "react";
import "../styles/style.scss";
import {
  FaClock,
  FaCheckCircle,
  FaHeadset,
  FaQuestionCircle,
} from "react-icons/fa";
import gsap from "gsap";
import Contact from "../components/sections/contact/Contact";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const faqRef = useRef(null);
  const benefitsRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && headingRef.current) {
      const timeline = gsap.timeline({ delay: 0.2 });

      // Animar o título da seção
      timeline.fromTo(
        headingRef.current.querySelectorAll(".animate-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Animar os benefícios
      if (benefitsRef.current) {
        timeline.fromTo(
          benefitsRef.current.querySelectorAll(".benefit-item"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      // Animar o FAQ
      if (faqRef.current) {
        timeline.fromTo(
          faqRef.current.querySelectorAll(".faq-item"),
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        );
      }
    }
  }, []);

  const toggleFaq = (e) => {
    const item = e.currentTarget;
    const content = item.querySelector(".faq-content");
    const isOpen = item.classList.contains("open");

    if (isOpen) {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => item.classList.remove("open"),
      });
    } else {
      item.classList.add("open");
      gsap.to(content, {
        height: "auto",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simular envio
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Reset after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Contact />
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} Luís Carlos</p>
      </footer>
    </>
  );
};

export default ContactPage;
