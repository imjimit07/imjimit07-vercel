import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { spring } from '@/lib/motion';

import * as siteMetadata from '@/data/siteMetadata';

const NewsletterForm = ({ title = 'Subscribe to the newsletter' }) => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: inputEl.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setError(true);
      setMessage(
        'Your e-mail address is invalid or you are already subscribed!',
      );
      return;
    }

    if (inputEl.current) inputEl.current.value = '';
    setError(false);
    setSubscribed(true);
    setMessage('Successfully! You are now subscribed.');
  };

  return (
    <div>
      <div className='pb-1 text-lg font-semibold tracking-apple-tight text-gray-800 dark:text-gray-100'>
        {title}
      </div>
      <form className='flex flex-col sm:flex-row' onSubmit={subscribe}>
        <div>
          <label className='sr-only' htmlFor='email-input'>
            Email address
          </label>
          <input
            autoComplete='email'
            className='w-72 rounded-apple-base border border-gray-200/80 bg-white/70 px-4 py-2 text-sm text-gray-900 transition-shadow duration-150 placeholder:text-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-100'
            id='email-input'
            name='email'
            placeholder={
              subscribed ? "You're subscribed 🎉" : 'Enter your email'
            }
            ref={inputEl}
            required
            type='email'
            disabled={subscribed}
          />
        </div>
        <div className='mt-2 flex w-full sm:mt-0 sm:ml-3'>
          <motion.button
            className='w-full rounded-apple-base bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-apple-sm transition-colors duration-150 hover:bg-primary-700 disabled:opacity-70 dark:hover:bg-primary-500 sm:py-0'
            type='submit'
            disabled={subscribed}
            whileTap={{ scale: 0.97 }}
            transition={spring.press}
          >
            {subscribed ? 'Thank you!' : 'Sign up'}
          </motion.button>
        </div>
      </form>
      {/* Completion and error feedback slide in where the eye already is */}
      <AnimatePresence>
        {(error || subscribed) && (
          <motion.p
            role={error ? 'alert' : 'status'}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={spring.snappy}
            className={clsx(
              'pt-2 text-sm',
              error
                ? 'text-red-500 dark:text-red-400'
                : 'text-green-600 dark:text-green-400',
            )}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsletterForm;

export const BlogNewsletterForm = ({ title }) => (
  <div className='not-prose my-8 flex items-center justify-center'>
    <div className='material w-full max-w-lg rounded-apple-xl p-6 sm:px-10 sm:py-8'>
      <NewsletterForm title={title} />
    </div>
  </div>
);
