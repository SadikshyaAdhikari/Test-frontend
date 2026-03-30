import React from "react";
import { colors } from "@/utils/colors";

export default function InputField({
    id,
    type = "text",
    label,
    register,
    required,
    errors,
    placeholder = " ",
    className = "",
}) {
    return (
        <div className={`relative mb-6 w-full ${className}`}>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                style={{
                    backgroundColor: colors.background,
                    text: colors.inputText,
                    border: `1px solid ${colors.inputBorder}`,
                }}
                className="peer w-full px-4 py-3
                            rounded-2xl
                            focus:outline-none 
                            focus:ring-1 focus:ring-gray-500
                            focus:border-transparent"
                {...register(id, { required })}
            />

            <label
                htmlFor={id}
                style={{ border: colors.inputBorder }}

                className="absolute left-4 top-3 text-gray-400 text-base
          transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-focus:top-1
          peer-focus:text-xs
          peer-focus:text-gray-400
          peer-[&:not(:placeholder-shown)]:top-1
          peer-[&:not(:placeholder-shown)]:text-xs
          peer-[&:not(:placeholder-shown)]:text-gray-500"
            >
                {label}
            </label>

            {errors?.[id] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[id].message || `${label} is required`}
                </p>
            )}
        </div>
    );
}