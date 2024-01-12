'use client';

import * as React from 'react';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  width: 100%;
  background: rgba(75, 75, 75, 0.24);
  height: 10px;
  display: flex;
  justify-content: space-around;
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
`;

export function Navbar(props: NavbarProps) {
  const { className } = props;

  return <NavbarWrapper className={className}></NavbarWrapper>;
}

export type NavbarProps = {
  className?: string;
};
