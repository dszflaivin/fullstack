export default function UserProfile({params}:any) {
    return (
        <div className="flex flex-col items-center
        justify-center min-h-screen py-2">
            <h1 className="font-bold p-4 text-4xl">Profile</h1>
            <hr />
            <p className="text-3xl p-2">
                Profile Page
                <span className="p-2 ml-2 rounded bg-amber-100 text-black">{params.id}</span>
            </p>
        </div>
    )
}