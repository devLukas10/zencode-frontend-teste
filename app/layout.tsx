"use client"
import { HeaderComponent } from "@/components/headers/header_component";
import { ButtonGroup } from "@/components/widgets/button_group";
import { SearchBar } from "@/components/widgets/search_bar";
import { SelectGroup } from "@/components/widgets/select_group";
import { CandidateLayoutWrap } from "@/components/layouts/candidate_layout_wrap";
import { AuthLoginLayout } from "@/components/layouts/auth_login_layout";
import { UserRepository } from "@/repository/user_repository";

import "../assets/styles/globals.css";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userRepo = new UserRepository();
  
  if (!userRepo.auth_locally()) return (
    <html lang="pt">
      <body>
        <AuthLoginLayout />;
      </body>
    </html>
  )


  
  return (
    <html lang="pt">
      <body>
        <div className="grid-layout">
            {/**** HEADERS */}
          <div className="sub-header gap-6">
    
            {/*** HeaderComponent */}

            <HeaderComponent />

            <div className="w-[95%] flex items-center gap-4 hidden">
              <SearchBar />

              <SelectGroup.WithTextOption 
                placeholder="Select Job"
                onChange={(e)=> console.log(e)}
              />

              <SelectGroup.WithTextOption 
                placeholder="Select Job"
                onChange={(e)=> console.log(e)}
              />
              
              <ButtonGroup.CustomButton
                className="w-[110px] h-[50px] bg-blue-500 rounded-md flex items-center justify-center p-2 cursor-pointer shadow-md"
                loading={false}
                disabled={false}
              >
                <span className="text-[10pt] text-white font-bold ">Filter</span>
              </ButtonGroup.CustomButton>
            </div>

          </div>

          <div className="layout-container">
            
              <CandidateLayoutWrap />
              
              {children}
          </div>
        </div>
      </body>
    </html>
  );
}
