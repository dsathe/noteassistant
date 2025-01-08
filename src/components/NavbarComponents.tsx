"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from "next/link";
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import SearchBar from './SearchBar';

type Props = {}

const NavbarComponents = (props: Props) => {

    return (
        <>
            <div className="hidden md:block">
                <div className="mt-10 flex justify-between items-center md:flex-row flex-col">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="mr-auto text-3xl font-bold text-gray-900 ml-[50px]">My Notes</h1>
                        <SearchBar />
                        <div>
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
            <div className="block md:hidden">
                <div className="mt-10 flex justify-between items-center md:flex-row flex-col">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="mr-auto text-3xl font-bold text-gray-900 ml-[20px]">My Notes</h1>
                        <div className='mr-[20px]'>
                            <UserButton />
                        </div>
                    </div>
                    <br />
                    <SearchBar />
                </div>
            </div>
        </>

    )
}

export default NavbarComponents;