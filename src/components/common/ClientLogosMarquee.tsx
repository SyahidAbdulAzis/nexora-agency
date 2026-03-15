import {
  FaApple,
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaSpotify,
  FaFacebook,
  FaSlack,
  FaAirbnb,
  FaInstagram,
  FaLinkedin,
  FaDropbox,
  FaPinterest,
  FaYoutube,
  FaDribbble,
  FaBehance,
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const CLIENT_BRANDS = [
  { id: 'apple', label: 'Apple', Icon: FaApple },
  { id: 'google', label: 'Google', Icon: FaGoogle },
  { id: 'microsoft', label: 'Microsoft', Icon: FaMicrosoft },
  { id: 'amazon', label: 'Amazon', Icon: FaAmazon },
  { id: 'spotify', label: 'Spotify', Icon: FaSpotify },
  { id: 'facebook', label: 'Facebook', Icon: FaFacebook },
  { id: 'slack', label: 'Slack', Icon: FaSlack },
  { id: 'airbnb', label: 'Airbnb', Icon: FaAirbnb },
  { id: 'x', label: 'X', Icon: FaXTwitter },
  { id: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { id: 'linkedin', label: 'LinkedIn', Icon: FaLinkedin },
  { id: 'dropbox', label: 'Dropbox', Icon: FaDropbox },
  { id: 'pinterest', label: 'Pinterest', Icon: FaPinterest },
  { id: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { id: 'dribbble', label: 'Dribbble', Icon: FaDribbble },
  { id: 'behance', label: 'Behance', Icon: FaBehance },
]

export function ClientLogosMarquee() {
  const duplicated = [...CLIENT_BRANDS, ...CLIENT_BRANDS, ...CLIENT_BRANDS]
  return (
    <section
      className="w-full overflow-hidden border-y border-[rgba(255,255,255,0.15)] py-8 md:py-10"
      style={{ backgroundColor: '#C4714F' }}
    >
      <div className="flex min-w-full items-center gap-14 md:gap-20 animate-[marquee-logos_16s_linear_infinite]">
        {duplicated.map(({ id, label, Icon }, i) => (
          <div
            key={`${id}-${i}`}
            className="flex flex-shrink-0 items-center"
            aria-label={label}
          >
            <Icon
              size={34}
              color="#FFFFFF"
              className="md:h-10 md:w-10"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
