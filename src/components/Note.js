import React from "react";
import ReactMarkdown from "react-markdown";
import {format} from 'date-fns'
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import NoteUser from "./NoteUser";
import { IS_LOGGED_IN } from "../gql/query";
import { Router } from "react-router-dom";
// keeps notes from extending wider than 800px
const StyledNote =styled.article`
    max-width: 800px;
    margin: 0 auto;
`;

// style the metadata
const MetaData = styled.div`
    @media (min-width: 500px){
        display: flex;
        align-items: top;
    }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
    padding-right: 1em;
`;

// align 'UserActions' to the right on large screens
const UserActions = styled.div`
    margin-left: auto;
`;


const Note = ({note}) => {

    const {loading, error, data} =useQuery(IS_LOGGED_IN);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error  loading Notes</p>

    return (
        <StyledNote>
            <MetaData>
            <MetaInfo>
            <img
                    src={note.author.avatar}
                    alt={`${note.author.username} avatar`}
                    height=  "60px"
            />
            </MetaInfo>
            <MetaInfo>
                <em>by: </em>{note.author.username}<br />
                Created: {format(note.createdAt, 'MMM Do YYYY HH:MM:SS')}<br />
                Edited: &nbsp;  {format(note.updatedAt, 'MMM Do YYYY HH:MM:SS')}
            </MetaInfo>
            {data.isLoggedIn ? (
                <UserActions>
                    <NoteUser note={note} />
                </UserActions>
            ):(
                <UserActions>
                <em>Favorites:</em>{note.favoriteCount}
            </UserActions>
            )}
            </MetaData>  
         <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;