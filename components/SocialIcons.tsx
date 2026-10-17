import clsx from 'clsx';
import { Colors } from 'config/colors';
import { contact, ContactType } from 'config/contact';
import React, { memo } from 'react';
import { IconBaseProps } from 'react-icons';
import { motion } from 'motion/react';
import { FaLinkedinIn as LinkedinIcon } from 'react-icons/fa';
import {
  IoLogoGithub as GithubIcon,
  IoLogoTwitter as TwitterIcon,
} from 'react-icons/io';
import { SiGmail as MailIcon, SiYoutube as YoutubeIcon } from 'react-icons/si';
import { spring, useHoverCapable } from '@/lib/motion';
import { Maybe, Tuple } from 'types';

interface SocialIconsProps {
  className?: string;
}

function SocialIcons(props: SocialIconsProps): React.ReactElement {
  const { className } = props;
  // whileHover states latch after a tap on touch devices — gate the lift
  const canHover = useHoverCapable();

  return (
    <div className={clsx('mt-2 flex', className)}>
      {React.Children.toArray(
        Object.entries(contact.links).map(entry =>
          resolveIcon(entry, canHover),
        ),
      )}
    </div>
  );
}

function resolveIcon(entry: Tuple<string>, canHover: boolean): React.ReactNode {
  const [type, url] = entry;

  const props: IconBaseProps = {
    className: 'icon text-2xl mr-6',
    color: Colors[type],
  };

  let icon: Maybe<React.ReactNode> = null;

  switch (type) {
    case ContactType.linkedin:
      icon = <LinkedinIcon {...props} />;
      break;

    case ContactType.twitter:
      icon = <TwitterIcon {...props} />;
      break;

    case ContactType.github:
      icon = <GithubIcon {...props} />;
      break;

    case ContactType.youtube:
      icon = <YoutubeIcon {...props} />;
      break;

    case ContactType.email:
      icon = <MailIcon {...props} />;
      break;
    default:
      break;
  }

  return (
    <motion.a
      key={type}
      className='social-icons'
      href={url}
      aria-label={type}
      target='_blank'
      rel='noopener noreferrer'
      // Springs carry the icon up and back — interruptible mid-hover
      whileHover={canHover ? { y: -1 } : undefined}
      whileTap={{ scale: 0.97, transition: spring.press }}
      transition={spring.snappy}
    >
      {icon}
    </motion.a>
  );
}

export default memo(SocialIcons);
