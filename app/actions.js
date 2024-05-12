'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigateToWorkplace() {
  redirect(`/workplace`)
}
