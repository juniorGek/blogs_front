import Link from "next/link";
import {Fragment} from "react";

const Button = ({children, variant, size, href, className, ...props}) => {
    let variants = {
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'success': 'btn-success',
        'danger': 'btn-danger',
        'warning': 'btn-warning',
        'info': 'btn-info',
        'light': 'btn-light',
        'dark': 'btn-dark',
        'link': 'btn-link',
        'outline-primary': 'btn-outline-primary',
        'outline-secondary': 'btn-outline-secondary',
        'outline-success': 'btn-outline-success',
        'outline-danger': 'btn-outline-danger',
        'outline-warning': 'btn-outline-warning',
        'outline-info': 'btn-outline-info',
        'outline-light': 'btn-outline-light',
        'outline-dark': 'btn-outline-dark',
    }

    let sizes = {
        'sm': 'btn-sm',
        'lg': 'btn-lg',
    }

    let Wrapper = !!href ? ({children}) => <Link href={href}>{children}</Link> : Fragment


    return (
        <Wrapper>
            <button className={`btn ${variants[variant] || ''} ${sizes[size] || ''} ${className}`} {...props}>
                {children}
            </button>
        </Wrapper>
    )
}

export default Button