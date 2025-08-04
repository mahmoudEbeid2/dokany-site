import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useSelector } from 'react-redux';
import Logo from '../Logo/Logo';

const Footer = () => {
    const { sellerInfo } = useSelector((state) => state.seller);

    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="d-flex justify-content-center justify-content-md-between align-items-start">
                    <Col md={4}>
                        <div className={styles.footerBrand}>
                            <Logo variant="footer" />
                            <p className={styles.footerDescription}>
                                Your trusted online store for high-quality products. Secure payments, fast delivery, and exceptional customer service.
                            </p>
                        </div>
                    </Col>
                    
                    <Col md={4}>
                        <div className={styles.footerLinks}>
                            <h5 className={styles.footerTitle}>Quick Links</h5>
                            <ul className={styles.linksList}>
                                <li><Link to="/" className={styles.footerLink}>Home</Link></li>
                                <li><Link to="/shoppage" className={styles.footerLink}>Shop</Link></li>
                                <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
                                <li><Link to="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </Col>
                    
                    <Col md={4}>
                        <div className={styles.footerSocial}>
                            <h5 className={styles.footerTitle}>Follow Us</h5>
                            <div className={styles.socialLinks}>
                                <a href="#" className={styles.socialLink} aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="Twitter">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="Facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                
                <hr className={styles.footerDivider} />
                
                <Row>
                    <Col className="text-center">
                        <p className={styles.copyright}>
                            &copy; {new Date().getFullYear()} {sellerInfo?.f_name || 'Dockany'}. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

