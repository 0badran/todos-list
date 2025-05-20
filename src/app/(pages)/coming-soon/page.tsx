import Image from "next/image";


export default async function ComingSoon() {
    return (
        <Image src="/images/coming-soon.png" alt="coming soon" width={500} height={500} className="mx-auto" />
    )
}

