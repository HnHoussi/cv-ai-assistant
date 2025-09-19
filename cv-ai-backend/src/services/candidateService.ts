// to run queries into the db
import {supabase} from "../config/db.js";

//Fetch candidate object (candidate + skills + experience + education)
export async function getCandidateProfile(candidateId: number) {

    //Fetch basic infos
    const {data: candidate, error: candidateError} = await supabase
        .from("candidates")
        .select("*")
        .eq("id", candidateId)
        .single();

    if (candidateError) throw candidateError;

    // Fetch skills
    const { data: skills } = await supabase
        .from("skills")
        .select("skill")
        .eq("candidate_id", candidateId);

    // Fetch experiences
    const { data: experience } = await supabase
        .from("experience")
        .select("company, role, start_date, end_date, description")
        .eq("candidate_id", candidateId);

    // Fetch education
    const { data: education } = await supabase
        .from("education")
        .select("school, degree, start_date, end_date")
        .eq("candidate_id", candidateId);

    return {
        ...candidate,
        skills: skills?.map(s => s.skill) || [],
        experience: experience || [],
        education: education || [],
    };

}