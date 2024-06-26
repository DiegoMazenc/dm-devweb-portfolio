import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import astroboySpaceship from '../img/astroboySpaceship.png';
import flame from '../img/flame.png';
import cv from '../img/CV_MazencDiégo2024.pdf';
import githubLogo from '../img/githubLogo.png';
import linkedin from '../img/linkedin.png';

const TypingText = ({ text, delay }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const animationDelay = 100;
    let interval;

    const animateText = () => {
      interval = setInterval(() => {
        if (currentIndex < text.length - 1) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayText('');
            currentIndex = 0;
            animateText();
          }, delay);
        }
      }, animationDelay);
    };

    animateText();

    return () => {
      clearInterval(interval);
    };
  }, [text, delay]);

  return <p>{displayText}</p>;
};

export const ContactUs = () => {
  const form = useRef();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailValidationRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailValidationRegex.test(newEmail));
  };

  const sendEmail = (event) => {
    event.preventDefault();

    if (!isEmailValid) {
      console.error('Veuillez entrer une adresse email valide.');

      setEmail('');

      return;
    }

    emailjs
      .sendForm('service_5bn38qj', 'template_xc3iie9', form.current, 'tU5x-6cN0oZf7QHdu')
      .then(
        (result) => {
          console.log(result.text);
          setConfirmationMessage('Le formulaire a bien été soumis.');
          form.current.reset();
          setEmail('');
          alert('Le formulaire a bien été soumis.');
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='footer' id='footer'>
      <div className='topFooter'>
        <div className='textFooter'>
          <div className='textAnimate'>
            <TypingText text=" Houston, est-ce que vous me recevez?" delay={2000} />
          </div>
          <p className='textForm'>Contactez-moi, j'ai plein de nouvelles ressources ! Houston ?</p>
          <div className='socialLink'>
            <a href="https://github.com/DiegoMazenc?tab=repositories" target="_blank">
              <img className='imgLink' src={githubLogo} alt="" />
            </a>
            <a href="https://www.linkedin.com/in/di%C3%A9go-mazenc-89811313b/" target="_blank">
              <img className='linkedin' src={linkedin} alt="" />
            </a>
          </div>
          <div className='contactNumCv'>
            <p>contact@diego-mazenc.com</p>
            <p>06.27.79.49.77</p>
            <a href={cv} target='_blank'>
              {' '}
              Voir mon CV
            </a>
          </div>
        </div>
        <div className='imgAnim'>
          <img src={flame} alt='' className='flame' />
          <img src={astroboySpaceship} alt='' className='astroboySpaceship' />
        </div>
      </div>

      <form className='formContact' ref={form} onSubmit={sendEmail}>
        <input className='nameForm' type='text' name='user_name' placeholder='Votre Nom' required />
        <input
          className='mailForm'
          type='email'
          name='user_email'
          placeholder={
            isEmailValid
              ? 'Votre Email'
              : 'Veuillez entrer une adresse email valide'
          }
          onChange={handleEmailChange}
          value={email}
          required
        />
        <textarea name='message' placeholder='Votre Message' required />
        <input className='btnForm' type='submit' value='Send' />
      </form>
      <p className='credits'>Site web par Diégo Mazenc | React | crédits illustrations : catalyststuff, Freepik</p>
    </div>
  );
};

export default ContactUs;
