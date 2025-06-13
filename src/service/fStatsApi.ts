import {ApiMessage, Project} from "./types.ts";

const HOST = "https://api.fstats.dev/v3";

export const getProjects = async (): Promise<Project[]> => {
    const response = await fetch(`${HOST}/projects`);

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message);

    return await response.json() as Project[];
};
