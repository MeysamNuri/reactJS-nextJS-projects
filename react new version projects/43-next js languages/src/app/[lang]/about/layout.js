export default function Layout({ children, modal }) {
    return (
        <div className="container mx-auto">
            {children}
            {modal}
        </div>
    );
}
