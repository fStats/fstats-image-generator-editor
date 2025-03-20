import {useQuery} from "@tanstack/react-query";
import {getProjects} from "./fStatsApi.ts";
import {Project} from "./types.ts";

export const useProject = () => useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: () => getProjects()
})
