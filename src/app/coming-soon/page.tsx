import Image from "next/image";

interface Props { }

export default async function ComingSoon(props: Props) {
    return (
        <Image src="/images/coming-soon.png" alt="coming soon" width={500} height={500} className="mx-auto" />
    )
}

