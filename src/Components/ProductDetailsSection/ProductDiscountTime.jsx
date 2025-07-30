import styles from './ProductDetails.module.css';
import { useState, useEffect } from 'react';

const TimeComponents = ({ value, label }) => {
    return (
        <div className={styles.timeItem}>
            <div className={styles.timeValue}>{value}</div>
            <div className={styles.timeLabel}>{label}</div>
        </div>
    );
};

function ProductDiscountTime() {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function getTimeRemaining() {
        const target = new Date();
        target.setDate(target.getDate() + 2);
        target.setHours(0, 0, 0, 0);

        const now = new Date();
        const total = target - now;

        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    }

    const pad = (num) => String(num).padStart(2, '0');

    if (timeLeft.total <= 0) {
        return <p className="text-danger">Offer expired</p>; 
    }

    return (
        <div className="w-100" >
            <div className={styles.sectionHeading}>Offer expires in:</div>
            <div className="d-flex justify-content-center justify-content-lg-start gap-2 align-items-center">
                <TimeComponents value={pad(timeLeft.days)} label="days" />
                <TimeComponents value={pad(timeLeft.hours)} label="hours" />
                <TimeComponents value={pad(timeLeft.minutes)} label="minutes" />
                <TimeComponents value={pad(timeLeft.seconds)} label="seconds" />
            </div>
        </div>
    );
}

export default ProductDiscountTime;


