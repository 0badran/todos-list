import Home from "@/app/(pages)/page";

export default function TodoLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Home />
            {/* Content */}
            <div className="mt-7">
                {children}
            </div>
        </div>
    );
}