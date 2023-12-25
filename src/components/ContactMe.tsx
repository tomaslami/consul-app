import Image from 'next/image'
import React, { type ChangeEvent, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import dir_url from '../pages/api/url'

const ContactMe = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const notifySuccess = () => {
    toast('El mensaje se envió correctamente', {
      icon: '✅',
      style: {
        background: 'white',
        color: 'black',
        fontWeight: '600',
        border: '1px solid black',
        padding: '10px',

      },
      duration: 2500,
      position: 'bottom-right',

    });
  };

  const notifyError = () => {
    toast('Ha ocurrido un error', {
      icon: '❌',
      style: {
        background: 'white',
        color: 'black',
        fontWeight: '600',
        border: '1px solid black',
        padding: '10px',
      },
      duration: 2500,
      position: 'bottom-right',
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        notifySuccess();
      } else {
      }
    } catch (err) {
      notifyError();
      console.error(err);
    }
  };

  return (
    <div className='w-1/2 h-full flex justify-center'>
      <h1 className="">Contáctame</h1>
      <form onSubmit={handleSubmit} className="w-[400px] h-full flex justify-center items-center flex-col gap-6">
        <div className="w-full flex flex-row justify-center items-center gap-5">
          <input id='name' value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} name='name' type="text" placeholder='Nombre' className='w-1/2' autoComplete='off' />
          <input id='email' value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} name='email' type="email" placeholder='Email' className='w-1/2' autoComplete='off' />
        </div>
        <div className=" w-full flex justify-center items-center flex-col gap-6">
          <input id='subject' value={subject} onChange={(e: ChangeEvent<HTMLInputElement>) => setSubject(e.target.value)} name='subject' type="text" placeholder='Asunto' className='w-full' autoComplete='off' />
          <textarea id='message' value={message} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)} name='message' placeholder='Mensaje' className='w-full h-[145px] rounded-sm resize-none focus:outline-none p-2' autoComplete='off'></textarea>
        </div>
        <div className=" w-full flex justify-end items-center flex-row">
          <button type='submit' className='font-medium text-sm text-white w-[100px] h-[30px] rounded-sm flex flex-row justify-center items-center gap-2 bg-[#0d4148]'>Enviar <img src="/icons/SendIcon.svg" alt="Enviar" className='w-[18px] h-[18px]' /> </button>
        </div>
      </form>
    </div>
  );
};

export default ContactMe;