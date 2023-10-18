import {useAppSelector} from "../hooks/redux";

export function FavouritesPage() {
    const {favourites} = useAppSelector(state => state.github)
    if (favourites.length === 0) return <p className="text-center">No items</p>
    return (
       <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
           <ul className="list-none ">
               {favourites.map(fav => (
                   <li key={fav} className="border py-3 px-4 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
                       <a href={fav} target="_blank" rel="noreferrer">{fav}</a>
                   </li>
               ))}
           </ul>
       </div>
    )
}
