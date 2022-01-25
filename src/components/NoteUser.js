import React from "react";
import {useQuery} from '@apollo/client';
import { Link } from "react-router-dom";

import { GET_ME } from "../gql/query";

import { DELETE_NOTE } from "../gql/mutation";
import DeleteNote from "./DeleteNote";
import FavortiteNote from "./FavoriteNote";

const NoteUser = props =>{
    const {loading, error, data} = useQuery(GET_ME);
    if(loading) return <p>Loading...</p>;
    if(error) return<p>Error in  NoteUser</p>

    return (
        <React.Fragment>
            <FavortiteNote
            me={data.me}
            noteId ={props.note.id}
            favoriteCount= {props.note.favoriteCount}
            />
            <br />
            {data.me.id === props.note.author.id &&(
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edit</Link><br />
                    <DeleteNote noteId={props.note.id} />
                </React.Fragment>
            )}
             
            
        </React.Fragment>
    );
};

export default NoteUser;