import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faDiscord, faTwitter, faReddit, faFacebook, faInstagram, faTiktok, faTelegram, faMedium } from "@fortawesome/free-brands-svg-icons";

function Footer() {
   return (
      <footer>
         <Container className='p-2 text-center'>
            <Row>
               <Col>
                  <div>
                     <a href="https://t.me/wurklo" aria-label="Telegram" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTelegram} className="telegram" /></a>
                     <a href="https://www.facebook.com/Wurklo" aria-label="Facebook" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} className="facebook" /></a>
                     <a href="https://twitter.com/Wurklo" aria-label="Twitter" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} className="twitter" /></a>
                     <a href="https://www.reddit.com/user/Wurklo/comments/ri14n4/what_is_wurklo/" aria-label="Reddit" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faReddit} className="reddit" /></a>
                     <a href="https://www.instagram.com/wurklo/" aria-label="Instagram" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} className="instagram" /></a>
                     <a href="https://www.youtube.com/channel/UCxGURLHBrraodONmnB7jxcw" aria-label="Youtube" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube} className="youtube" /></a>
                     <a href="https://discord.gg/ZeYjq7m7vN" aria-label="Discord" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDiscord} className="discord" /></a>
                     <a href="https://wurklo.medium.com" aria-label="Medium" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faMedium} className="medium" /></a>
                     <a href="https://www.tiktok.com/@wurklo" aria-label="TikTok" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} className="tiktok" /></a>
                  </div>
               </Col>
            </Row>
         </Container>
      </footer>
   );
}


export default Footer;
