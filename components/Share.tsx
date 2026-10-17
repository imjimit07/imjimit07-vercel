import { Colors } from 'config/colors';
import { motion } from 'motion/react';
import {
  FaFacebook as FacebookIcon,
  FaLinkedinIn as LinkedinIcon,
} from 'react-icons/fa';
import { IoLogoTwitter as TwitterIcon } from 'react-icons/io';
import { SiGmail as EmailIcon, SiReddit as RedditIcon } from 'react-icons/si';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share';
import { spring, useHoverCapable } from '@/lib/motion';

interface ShareProps {
  title: string;
  url: string;
}

/** Share targets get a light spring lift on hover — feedback, not decoration. */
const hover = { y: -1 };

export default function Share(props: ShareProps): React.ReactElement {
  const { title, url } = props;
  const canHover = useHoverCapable();

  return (
    <div className='flex items-center justify-center pt-2'>
      <div className='flex w-44 items-center justify-between'>
        {
          // @ts-ignore
          <TwitterShareButton title={title} url={url}>
            <motion.span
              className='flex'
              whileHover={canHover ? hover : undefined}
              whileTap={{ scale: 0.97, transition: spring.press }}
              transition={spring.snappy}
            >
              <TwitterIcon size={22} color={Colors.twitter} />
            </motion.span>
          </TwitterShareButton>
        }
        {
          // @ts-ignore
          <RedditShareButton title={title} url={url}>
            <motion.span
              className='flex'
              whileHover={canHover ? hover : undefined}
              whileTap={{ scale: 0.97, transition: spring.press }}
              transition={spring.snappy}
            >
              <RedditIcon size={22} color={Colors.reddit} />
            </motion.span>
          </RedditShareButton>
        }
        {
          // @ts-ignore
          <FacebookShareButton title={title} url={url}>
            <motion.span
              className='flex'
              whileHover={canHover ? hover : undefined}
              whileTap={{ scale: 0.97, transition: spring.press }}
              transition={spring.snappy}
            >
              <FacebookIcon size={22} color={Colors.facebook} />
            </motion.span>
          </FacebookShareButton>
        }
        {
          // @ts-ignore
          <LinkedinShareButton title={title} url={url}>
            <motion.span
              className='flex'
              whileHover={canHover ? hover : undefined}
              whileTap={{ scale: 0.97, transition: spring.press }}
              transition={spring.snappy}
            >
              <LinkedinIcon size={22} color={Colors.linkedin} />
            </motion.span>
          </LinkedinShareButton>
        }
        {
          // @ts-ignore
          <EmailShareButton title={title} url={url}>
            <motion.span
              className='flex'
              whileHover={canHover ? hover : undefined}
              whileTap={{ scale: 0.97, transition: spring.press }}
              transition={spring.snappy}
            >
              <EmailIcon size={22} color={Colors.email} />
            </motion.span>
          </EmailShareButton>
        }
      </div>
    </div>
  );
}
