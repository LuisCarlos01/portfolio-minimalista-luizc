import React, { useState, useEffect } from "react";

const FormInput = ({
  type,
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required,
  disabled,
  pattern,
  title,
  minLength,
  icon,
  label,
  error,
  isFocused,
}) => {
  const isTextArea = type === "textarea";
  const InputComponent = isTextArea ? "textarea" : "input";
  const containerClass = isTextArea ? "textarea-container" : "input-container";
  const [animateIn, setAnimateIn] = useState(false);

  // Adiciona uma animação suave quando o componente é montado
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`form-group ${error ? "has-error" : ""} ${
        isFocused ? "focused" : ""
      } ${animateIn ? "animate-in" : ""}`}
      data-aos="fade-up"
      data-aos-delay={
        id === "name"
          ? "100"
          : id === "email"
          ? "200"
          : id === "subject"
          ? "300"
          : "400"
      }
    >
      <label htmlFor={id}>{label}</label>
      <div className={containerClass}>
        {icon && <span className="input-icon">{icon}</span>}
        <InputComponent
          type={isTextArea ? undefined : type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          disabled={disabled}
          pattern={pattern}
          title={title}
          minLength={minLength}
          autoComplete={
            type === "email"
              ? "email"
              : type === "text" && name === "name"
              ? "name"
              : "off"
          }
        />
        <div className="field-animation"></div>
      </div>
      {error && (
        <div className="error-message">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "5px" }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
