import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;

const Contact = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send admin notification email
    emailjs
      .sendForm(
        'service_2ty1mpx',        // Your EmailJS service ID
        'template_4gyspgi',         // Admin notification template ID
        form.current,
        'HuK2O-HLO84pm53Mn'      // Your EmailJS public key
      )
      .then(() => {
        // Extract user email and name from form for confirmation email
        const formData = new FormData(form.current);
        const userEmail = formData.get('user_email');
        const userName = formData.get('user_name');

        // Send confirmation email to user
        emailjs
          .send(
            'service_nuesf0u',        // Your EmailJS service ID
            'template_qft6s6a',          // User confirmation template ID
            {
              user_email: userEmail,
              user_name: userName
            },
            'DF5MC-a-mz3IC3bIm'      // Your EmailJS public key
          )
          .then(() => {
            setOpen(true);
            form.current.reset();
          })
          .catch((error) => {
            console.error('User confirmation email error:', error.text);
            setErrorOpen(true);
          });
      })
      .catch((error) => {
        console.error('Admin notification email error:', error.text);
        setErrorOpen(true);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
          />
          <ContactInput
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
          />
          <ContactInput
            type="text"
            name="subject"
            placeholder="Subject"
            required
          />
          <ContactInputMessage
            name="message"
            rows="4"
            placeholder="Message"
            required
          />
          <ContactButton type="submit" value="Send" />
        </ContactForm>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
            Email sent successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorOpen}
          autoHideDuration={6000}
          onClose={() => setErrorOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setErrorOpen(false)} severity="error" sx={{ width: '100%' }}>
            Failed to send email. Please try again.
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
