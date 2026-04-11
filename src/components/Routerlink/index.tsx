import { Link } from "react-router";

type RouterLinkProps = {
  children: React.ReactNode;
  to: string;
  className?: string;
  title?: string;
  "aria-label"?: string;
};

export function RouterLink({ children, to, ...props }: RouterLinkProps) {
  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
