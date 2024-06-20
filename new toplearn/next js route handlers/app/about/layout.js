export default function Layout({ children, modal }) {
    const adminAuth = () => {
        return false;
    };

    const isAdmin = adminAuth();
    return (
        <div
            className="container mx-auto"

        >
            {children}
            {modal}
        </div>
    );
}
