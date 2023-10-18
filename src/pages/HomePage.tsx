import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useEffect, useState} from "react";
import {useDebounce} from "../hooks/debounce";
import {RepoCard} from "../components/RepoCard";
import {IRepo} from "../models/models";
import errorImage from "../error.png";

export function HomePage() {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounced = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    })
    const [fetchRepos, {isLoading: areReposLoading, data:  repos}] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounced.length > 3 && data?.length! > 0)
    }, [data?.length, debounced])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className="flex flex-col items-center pt-10 mx-auto h-screen w-screen">
            <div className="relative w-[560px]">
                <input
                    type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {dropdown && <ul
                    className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                    {isLoading && <p className="text-center">Loading...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className="py-2 px-4 hover:text-white hover:bg-blue-400 transition-colors cursor-pointer"
                        >{user.login}</li>
                    ))}
                </ul>}
                <div className="container">
                    {areReposLoading && <p className="text-center">Repos are loading...</p>}
                    {repos?.map((repo: IRepo) => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>
            {isError && (
                <div className="flex flex-col items-center mt-4">
                    <img className="w-[48px]" src={errorImage} alt="Error icon" />
                    <p className="text-center font-bold text-orange-400">Something went wrong...</p>
                </div>
            )}
        </div>
    )
}
