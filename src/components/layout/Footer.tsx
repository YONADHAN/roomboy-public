export function Footer() {
    return (
        <footer className="border-t border-neutral-200 bg-neutral-50 py-12 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
                <p className="mb-2">&copy; {new Date().getFullYear()} Roomboy. All rights reserved.</p>
                <p>Find your next home.</p>
            </div>
        </footer>
    );
}
