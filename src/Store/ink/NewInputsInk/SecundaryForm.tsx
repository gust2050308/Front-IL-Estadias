import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, } from "lucide-react"
import { toast } from "sonner"
import { set } from 'date-fns'
import { TableRow, TableCell, Table } from '@/components/ui/table'

const formArraySchema = z.array(
    z.object({
        
    })
)

export default function SecundaryForm() {
  return (
    <div>
      
    </div>
  )
}
