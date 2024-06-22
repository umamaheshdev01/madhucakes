'use client'
import Link from "next/link";


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hjrsxzuuvihvcxsvuegx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqcnN4enV1dmlodmN4c3Z1ZWd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0NjE4MDEsImV4cCI6MjAzNDAzNzgwMX0.zpkbfkaqQU0ixqLtOwXJqZm5sSB4wRVILpRDCupiBUM'
const supabase = createClient(supabaseUrl, supabaseKey)


import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Chrome from "../../../components/demo/Chrome";
import Section from '../../../components/demo/Section'
import { useEffect, useState } from "react";

export default function Meds({params}) {
  
    const id = params.slug;

    const [ele,setEle] = useState(null)

    useEffect(()=>{
      

        const fetchme = async()=>{

            const {data,error} = await supabase.from('Product').select('*').eq('id',id)

           const dum = data[0]

           setEle({
              id : dum.id,
              name : dum.name,
              des : dum.description,
              short : dum.short,
              price : dum.price,
              img : dum.image
           })

          

        

        }
        fetchme();
    },[])



  return (
    <ContentLayout title="Cart">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/medicines">Product</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{ele?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


    {ele && <Section id={ele.id} name={ele.name} image={ele.img} des={ele.des} short={ele.short} price={ele.price}></Section>}
    </ContentLayout>
  );
}
