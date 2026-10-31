"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
CalendarDays,
Image as ImageIcon,
MapPin,
Type,
FileText,
Tag,
ArrowLeft,
Leaf,
} from "lucide-react";
import Link from "next/link";

const eventCategories = [
"Cleanup",
"Plantation",
"Donation",
"Healthcare",
"Education",
"Food Distribution",
"Other",
];

interface EventForm {
title: string;
description: string;
category: string;
image: string;
location: string;
date: string;
}

function getLocalDateString() {
const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

return `${year}-${month}-${day}`;
}

export default function CreateEventPage() {
const router = useRouter();

const [isSubmitting, setIsSubmitting] = useState(false);

const [formData, setFormData] = useState<EventForm>({
title: "",
description: "",
category: "",
image: "",
location: "",
date: "",
});

function handleChange(
e: React.ChangeEvent<
HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
) {
const { name, value } = e.target;


setFormData((previous) => ({
  ...previous,
  [name]: value,
}));


}

function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault();


if (!formData.title.trim()) {
  toast.error("Please enter an event title.");
  return;
}

if (!formData.description.trim()) {
  toast.error("Please enter an event description.");
  return;
}

if (!formData.category) {
  toast.error("Please select an event category.");
  return;
}

if (!formData.image.trim()) {
  toast.error("Please provide an event image URL.");
  return;
}

try {
  new URL(formData.image);
} catch {
  toast.error("Please enter a valid image URL.");
  return;
}

if (!formData.location.trim()) {
  toast.error("Please enter the event location.");
  return;
}

if (!formData.date) {
  toast.error("Please select an event date.");
  return;
}

if (formData.date <= getLocalDateString()) {
  toast.error("Please select a future date.");
  return;
}

setIsSubmitting(true);

// Frontend demo only. Database integration will be added later.
toast.success("Event form completed successfully!");

setTimeout(() => {
  setIsSubmitting(false);
  router.push("/events");
}, 1000);


}

const inputClass =
"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14"> <div className="mx-auto max-w-5xl">
{/* Back Navigation */} <Link
       href="/events"
       className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
     > <ArrowLeft size={17} />
Back to Events </Link>


    {/* Page Heading */}
    <div className="mb-9">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
        <Leaf size={16} />
        Make a Difference
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl">
        Create an Event
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
        Bring people together for a meaningful cause. Create an event and
        inspire your community to make a positive impact.
      </p>
    </div>

    {/* Form Container */}
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      {/* Form Header */}
      <div className="bg-[#174d36] px-6 py-7 text-white sm:px-9">
        <h2 className="text-xl font-semibold">Event Information</h2>
        <p className="mt-2 text-sm text-emerald-100">
          Fill in the details below to create your community event.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-9">
        {/* Event Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <Type size={17} className="text-emerald-700" />
            Event Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Winter Clothes Distribution"
            className={inputClass}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <FileText size={17} className="text-emerald-700" />
            Event Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the purpose and activities of your event..."
            rows={5}
            className={`${inputClass} resize-none`}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <Tag size={17} className="text-emerald-700" />
            Event Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select an event category</option>

            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
          >
            <ImageIcon size={17} className="text-emerald-700" />
            Thumbnail Image URL
          </label>

          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/event-image.jpg"
            className={inputClass}
            required
          />

          <p className="mt-2 text-xs text-gray-400">
            Provide a publicly accessible image URL.
          </p>
        </div>

        {/* Location and Date */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="location"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <MapPin size={17} className="text-emerald-700" />
              Event Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Mirpur 10, Dhaka"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
            >
              <CalendarDays size={17} className="text-emerald-700" />
              Event Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              min={getLocalDateString()}
              value={formData.date}
              onChange={handleChange}
              className={inputClass}
              required
            />

            <p className="mt-2 text-xs text-gray-400">
              Only future dates are allowed.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-gray-100 pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#174d36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
          >
            {isSubmitting ? "Creating Event..." : "Create Event"}
            {!isSubmitting && <Leaf size={17} />}
          </button>

          <p className="mt-4 text-xs leading-6 text-gray-400">
            By creating an event, you agree to organize it responsibly and
            respect the community.
          </p>
        </div>
      </form>
    </div>
  </div>
</main>


);
}
