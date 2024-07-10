import React from 'react';
import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
  h1 {
    margin-top: 0;
  }
`;

export const DateCreated = styled.span`
  color: #6B6B6B;
`

export const Tag = styled.div`
  color: #6B6B6B;
  margin-top: 10px;
  border-radius: 14px;
  font-size: 12px;
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`