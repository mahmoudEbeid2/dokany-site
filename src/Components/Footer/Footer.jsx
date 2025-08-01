import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row className="d-flex justify-content-center justify-content-md-between align-items-center">
                    <Col md={6}>
                        <div className="d-flex flex-column align-items-center align-items-md-start gap-2">
                            <h5 style={{ width: 'fit-content' }}>Dockany</h5>
                            <p style={{ width: 'fit-content' }}>We are an online store providing high-quality products.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-3 align-items-center">
                            <li><a href="/">Home</a></li>
                            <li><a href="/shop">Shop</a></li>
                            <li><a href="/product">Product</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </Col>
                    <hr style={{ borderColor: 'var(--footer-text)' }} />
                </Row>
                <Row className="mt-3 d-flex justify-content-center justify-content-md-between align-items-center">
                    <Col md={6} style={{ width: 'fit-content' }} className="d-flex flex-row align-items-center gap-3">
                        <p >&copy; {new Date().getFullYear()} All rights reserved.</p>
                        <ul className="list-unstyled d-flex justify-content-center justify-content-md-end gap-3 align-items-center">
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <ul className="list-unstyled d-flex gap-3 align-items-center justify-content-center justify-content-md-end">
                            <li><i className="bi bi-instagram"></i></li>
                            <li><i className="bi bi-twitter"></i></li>
                            <li><i className="bi bi-facebook"></i></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

