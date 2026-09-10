export default function ButtonLink({href, children, variant = 'primary', download = false, ...props}) {
  return <a className={`button-link button-link--${variant}`} href={href} download={download || undefined} {...props}>{children}</a>;
}
