import React, { useState, useEffect, useRef } from "react";
import FormInput from "./FormInput";
import {
  FaUser,
  FaEnvelope,
  FaPen,
  FaCommentAlt,
  FaPaperPlane,
  FaPhone,
  FaSearch,
  FaLaptopCode,
} from "react-icons/fa";
import gsap from "gsap";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    contactPreference: "email",
    referral: "",
    projectStatus: "",
  });

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState(null);

  const formRef = useRef(null);
  const statusRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Limpa o erro do campo quando o usuário digita algo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleFocus = (field) => {
    setFocused({
      ...focused,
      [field]: true,
    });
  };

  const handleBlur = (field) => {
    setFocused({
      ...focused,
      [field]: false,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (
      formData.phone &&
      !/^(?:\d{10,11}|\(\d{2}\)\s*\d{4,5}-\d{4})$/.test(formData.phone)
    ) {
      newErrors.phone = "Formato de telefone inválido";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Animação de shake no formulário para indicar erro
      gsap.fromTo(
        formRef.current,
        { x: -10 },
        { x: 0, duration: 0.3, ease: "elastic.out(1, 0.3)" }
      );
      return;
    }

    setIsSubmitting(true);
    setFormStatus("sending");

    try {
      // Simular o envio do formulário (em um ambiente real, isso seria uma chamada de API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simula sucesso
      setFormStatus("success");

      // Animação de sucesso
      if (statusRef.current) {
        gsap.fromTo(
          statusRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );
      }

      // Limpa o formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        contactPreference: "email",
        referral: "",
        projectStatus: "",
      });

      // Limpa o status após alguns segundos
      setTimeout(() => {
        if (statusRef.current) {
          gsap.to(statusRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setFormStatus(null),
          });
        } else {
          setFormStatus(null);
        }
      }, 5000);
    } catch (error) {
      setFormStatus("error");
      console.error("Erro ao enviar formulário:", error);

      // Limpa o status de erro após alguns segundos
      setTimeout(() => {
        if (statusRef.current) {
          gsap.to(statusRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setFormStatus(null),
          });
        } else {
          setFormStatus(null);
        }
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Para limpar os status de sucesso/erro após navegação
  useEffect(() => {
    return () => {
      if (formStatus) {
        setFormStatus(null);
      }
    };
  }, [formStatus]);

  // Animação de entrada dos elementos do formulário
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-group"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="contact-form-container">
      <h3 className="form-title">Envie sua mensagem</h3>
      <p className="form-subtitle">
        Preencha o formulário abaixo e entrarei em contato o mais breve
        possível.
      </p>

      {formStatus && (
        <div
          className={`form-status ${formStatus}`}
          ref={statusRef}
          role="alert"
        >
          {formStatus === "success" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "10px" }}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Sua mensagem foi enviada com sucesso! Retornarei em breve.
            </>
          ) : formStatus === "error" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "10px" }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              Houve um erro ao enviar sua mensagem. Por favor, tente novamente.
            </>
          ) : (
            <>Enviando mensagem...</>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" ref={formRef}>
        <div className="form-row">
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus("name")}
            onBlur={() => handleBlur("name")}
            placeholder="Seu nome"
            required
            icon={<FaUser />}
            label="Nome"
            error={errors.name}
            isFocused={focused.name}
          />

          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            placeholder="Seu email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            icon={<FaEnvelope />}
            label="Email"
            error={errors.email}
            isFocused={focused.email}
          />
        </div>

        <FormInput
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => handleFocus("phone")}
          onBlur={() => handleBlur("phone")}
          placeholder="Seu telefone (opcional)"
          icon={<FaPhone />}
          label="Telefone (WhatsApp)"
          error={errors.phone}
          isFocused={focused.phone}
        />

        <div className="form-group contact-preference">
          <label>Preferência de contato</label>
          <div className="preference-options">
            <label className="radio-label">
              <input
                type="radio"
                name="contactPreference"
                value="email"
                checked={formData.contactPreference === "email"}
                onChange={handleChange}
              />
              <span className="radio-text">Email</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="contactPreference"
                value="phone"
                checked={formData.contactPreference === "phone"}
                onChange={handleChange}
              />
              <span className="radio-text">Telefone/WhatsApp</span>
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="referral">Como me encontrou?</label>
            <div className="input-container">
              <span className="input-icon">
                <FaSearch />
              </span>
              <select
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                onFocus={() => handleFocus("referral")}
                onBlur={() => handleBlur("referral")}
                className="form-select"
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="google">Pesquisa no Google</option>
                <option value="social">Redes Sociais</option>
                <option value="linkedin">LinkedIn</option>
                <option value="github">GitHub</option>
                <option value="referral">Indicação de amigo</option>
                <option value="other">Outro</option>
              </select>
              <div className="field-animation"></div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="projectStatus">Situação do projeto</label>
            <div className="input-container">
              <span className="input-icon">
                <FaLaptopCode />
              </span>
              <select
                id="projectStatus"
                name="projectStatus"
                value={formData.projectStatus}
                onChange={handleChange}
                onFocus={() => handleFocus("projectStatus")}
                onBlur={() => handleBlur("projectStatus")}
                className="form-select"
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="idea">Tenho apenas uma ideia</option>
                <option value="planning">Estou planejando um projeto</option>
                <option value="design">
                  Tenho o design, preciso de desenvolvimento
                </option>
                <option value="ongoing">
                  Projeto em andamento, preciso de ajuda
                </option>
                <option value="refactor">
                  Quero melhorar um projeto existente
                </option>
                <option value="consultation">
                  Quero apenas uma consultoria
                </option>
              </select>
              <div className="field-animation"></div>
            </div>
          </div>
        </div>

        <FormInput
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={() => handleFocus("subject")}
          onBlur={() => handleBlur("subject")}
          placeholder="Assunto"
          required
          icon={<FaPen />}
          label="Assunto"
          error={errors.subject}
          isFocused={focused.subject}
        />

        <FormInput
          type="textarea"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={() => handleFocus("message")}
          onBlur={() => handleBlur("message")}
          placeholder="Sua mensagem"
          required
          minLength={10}
          icon={<FaCommentAlt />}
          label="Mensagem"
          error={errors.message}
          isFocused={focused.message}
        />

        <button
          type="submit"
          className={`submit-button ${isSubmitting ? "loading" : ""}`}
          disabled={isSubmitting}
        >
          {!isSubmitting && <FaPaperPlane style={{ marginRight: "8px" }} />}
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
