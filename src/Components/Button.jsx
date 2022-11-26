import React from 'react';
import Button from 'react-bootstrap/Button';

export default function CustomButton({ children, ...args }) {
    return (
        <Button {...args}>
           {children}
        </Button>
    )
}
