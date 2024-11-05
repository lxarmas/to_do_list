// src/components/Quote.js

import React, { useState } from 'react';
import quotes from './QuotesData';

const Quote = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(false);

    const fetchQuote = () => {
        setLoading(true);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        setQuote(randomQuote);
        setLoading(false);
    };

    return (
        <div style={styles.quoteContainer}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p style={styles.quote}>"{quote.text}"</p>
                    <p style={styles.author}>— {quote.author || 'Unknown'}</p>
                    <button onClick={fetchQuote} style={styles.button}>
                        Get a New Quote
                    </button>
                </>
            )}
        </div>
    );
};

const styles = {
    quoteContainer: {
        textAlign: 'center',
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    quote: {
        fontSize: '1.5rem',
        fontStyle: 'italic',
    },
    author: {
        fontSize: '1.2rem',
        color: '#555',
        marginTop: '10px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
};

export default Quote;
