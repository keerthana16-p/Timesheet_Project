{{
    config(
        tags=['staging']
    )
}}

with 
user as (
    select 
    id as User_Id,
    firstname as First_Name,
    lastname as Last_Type,
    email as Email,
    role as Role
    from {{ source('timesheet', 'userdetails') }}
)
select * from user