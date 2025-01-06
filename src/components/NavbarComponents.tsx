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
        <div className="mt-10 flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center justify-between w-full">
                <Link href='/'>
                    <Button className="bg-green-600 font-semibold" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={3} />
                        Back
                    </Button>
                </Link>
                <h1 className="mx-auto text-3xl font-bold text-gray-900 ml-500">My Notes</h1>
                <SearchBar />
                <div>
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default NavbarComponents;