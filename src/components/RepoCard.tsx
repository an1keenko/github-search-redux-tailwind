import { IRepo } from "../models/models";
import React, { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export function RepoCard({ repo }: { repo: IRepo }) {
    const { addFavourite, removeFavourite } = useActions();
    const { favourites } = useAppSelector((state) => state.github);
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavourite(repo.html_url);
        setIsFav(true);
    };

    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavourite(repo.html_url);
        setIsFav(false);
    };

    return (
        <div className="border py-3 px-4 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
            <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none"
            >
                <h2 className="text-lg font-bold text-blue-600 hover:underline">
                    {repo.full_name}
                </h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin text-gray-700">{repo?.description}</p>

                {!isFav && (
                    <button
                        className="px-4 bg-yellow-400 mr-2 my-2 rounded hover:shadow-md transition-all text-white"
                        onClick={addToFavourite}
                    >
                        Add
                    </button>
                )}
                {isFav && (
                    <button
                        className="px-4 my-2 bg-red-400 rounded hover:shadow-md transition-all text-white"
                        onClick={removeFromFavourite}
                    >
                        Remove
                    </button>
                )}
            </a>
        </div>
    );
}
