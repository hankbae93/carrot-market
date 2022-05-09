import React from "react";

const Test = () => {
	return (
		<>
			<div className='dark bg-slate-400 xl:place-content-center py-20 px-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3 min-h-screen'>
				<div className=' dark:bg-black landscape:bg-teal-500 bg-white sm:bg-red-400 md:bg-teal-400 lg:bg-indigo-300 xl:bg-yellow-300 p-6 rounded-3xl shadow-xl'>
					<span className='font-semibold text-3xl'>Select ITEM</span>
					<ul>
						{Array<number>(5)
							.fill(1)
							.map((i) => {
								return (
									<div
										className='flex justify-between my-2 first:bg-blue-50 last:bg-blue-50'
										key={i}
									>
										<span className='text-gray-500'>Grey Chair</span>
										<span className='font-semibold'>$19</span>
									</div>
								);
							})}
					</ul>
					{["a", "b", "c", ""].map((c, i) => {
						return (
							<li className='bg-red-500 py-2 empty:bg-blue-500' key={i}>
								{c}
							</li>
						);
					})}

					<div className='flex justify-between mt-2 pt-2 border-t-2 border-dashed'>
						<span>Total</span>
						<span className='font-semibold'>$10</span>
					</div>
					<div className='mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:text-red-500'>
						Checkout
					</div>
				</div>

				<div className='bg-white overflow-hidden rounded-2xl shadow-xl group'>
					<div className='bg-blue-500 p-6 pb-14'>
						<span className='text-white text-2xl'>Profile</span>
					</div>

					<div className='rounded-3xl p-6 relative -top-5 bg-white'>
						<div className='flex relative -top-16 items-end justify-between'>
							<div className='flex flex-col items-center'>
								<span className='text-small text-gray-500'>Orders</span>
								<span className='font-medium'>340</span>
							</div>
							<div className='h-24 w-24 bg-gray-400 rounded-full group-hover:bg-red-300 transition-colors' />
							<div className='flex flex-col items-center'>
								<span className='text-small text-gray-500'>Spent</span>
								<span className='font-medium'>$340</span>
							</div>
						</div>
						<div className='relative flex flex-col items-center -mt-14 -mb-5'>
							<span className='text-lg font-medium'>Tony Molloy</span>
							<span className='text-sm text-gray-500'>미국</span>
						</div>
					</div>
				</div>

				<div className='bg-white p-10 rounded-2xl shadow-xl lg:col-span-2 xl:col-span-1'>
					<div className='flex-col mb-5 justify-between items-center'>
						<span>⬅️</span>
						<div className='space-x-3'>
							<span>🌠4.9</span>
							<span className='shadow-xl p-2 rounded-md'>♥️</span>
						</div>

						<div className='bg-zinc-400 h-72 mb-5' />

						<div className='flex flex-col'>
							<span className='font-medium text-xl'>Swoon Lounge</span>
							<span className='text-xs text-gray-500'>Chair</span>
							<div className='flex justify-between items-center mt-3 mb-5'>
								<div className='space-x-2'>
									<button className='w-5 h-5 rounded-full bg-yellow-500 ring-offset-2 ring-yellow-500 focus:ring-2 transition' />
									<button className='w-5 h-5 rounded-full bg-indigo-500  ring-offset-2 ring-indigo-500 focus:ring-2 transition' />
									<button className='w-5 h-5 rounded-full bg-teal-500  ring-offset-2 ring-teal-500 focus:ring-2 transition' />
								</div>

								<div className='flex items-center space-x-5'>
									<button className='p-2.5 rounded-lg bg-blue-200 flex justify-center items-center w-8 aspect-square  text-xl text-gray-500'>
										-
									</button>
									<span>1</span>
									<button className='p-2.5 rounded-lg bg-blue-200 flex justify-center items-center w-8 aspect-square  text-xl text-gray-500'>
										+
									</button>
								</div>
							</div>
							<div className='flex justify-between items-center'>
								<span className='font-medium text-2xl'>$460</span>
								<button className='bg-blue-500 text-center text-white rounded-lg py-2 px-8 text-xs'>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<form className='flex flex-col space-y-2 bg-blue-500 px-3 py-10 focus-within:bg-blue-100 transition'>
				<input
					type='text'
					required
					placeholder='Username'
					className='peer required:border-2 border-yellow-500'
				/>
				<span className='hidden peer-invalid:block peer-invalid:text-red-500'>
					this input invalid
				</span>
				<input type='submit' value='Login' className='bg-white' />
			</form>

			<div className='bg-slate-400 py-20 px-10 grid gap-5 min-h-screen'>
				<div className='bg-white p-6 rounded-3xl shadow-xl'>
					<span className='font-semibold text-3xl'>Select ITEM</span>
					<ul>
						{Array<number>(5)
							.fill(1)
							.map((i) => {
								return (
									<div
										className='flex justify-between my-2 first:bg-blue-50 last:bg-blue-50'
										key={i}
									>
										<span className='text-gray-500'>Grey Chair</span>
										<span className='font-semibold'>$19</span>
									</div>
								);
							})}
					</ul>
					{["a", "b", "c", ""].map((c, i) => {
						return (
							<li className='bg-red-500 py-2 empty:bg-blue-500' key={i}>
								{c}
							</li>
						);
					})}

					<div className='flex justify-between mt-2 pt-2 border-t-2 border-dashed'>
						<span>Total</span>
						<span className='font-semibold'>$10</span>
					</div>
					<div className='mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-1/2 mx-auto hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:text-red-500'>
						Checkout
					</div>
				</div>

				<div className='bg-white overflow-hidden rounded-2xl shadow-xl group'>
					<div className='bg-blue-500 p-6 pb-14'>
						<span className='text-white text-2xl'>Profile</span>
					</div>

					<div className='rounded-3xl p-6 relative -top-5 bg-white'>
						<div className='flex relative -top-16 items-end justify-between'>
							<div className='flex flex-col items-center'>
								<span className='text-small text-gray-500'>Orders</span>
								<span className='font-medium'>340</span>
							</div>
							<div className='h-24 w-24 bg-gray-400 rounded-full group-hover:bg-red-300 transition-colors' />
							<div className='flex flex-col items-center'>
								<span className='text-small text-gray-500'>Spent</span>
								<span className='font-medium'>$340</span>
							</div>
						</div>
						<div className='relative flex flex-col items-center -mt-14 -mb-5'>
							<span className='text-lg font-medium'>Tony Molloy</span>
							<span className='text-sm text-gray-500'>미국</span>
						</div>
					</div>
				</div>

				<div className='bg-white p-10 rounded-2xl shadow-xl'>
					<div className='flex-col mb-5 justify-between items-center'>
						<span>⬅️</span>
						<div className='space-x-3'>
							<span>🌠4.9</span>
							<span className='shadow-xl p-2 rounded-md'>♥️</span>
						</div>

						<div className='bg-zinc-400 h-72 mb-5' />

						<div className='flex flex-col'>
							<span className='font-medium text-xl'>Swoon Lounge</span>
							<span className='text-xs text-gray-500'>Chair</span>
							<div className='flex justify-between items-center mt-3 mb-5'>
								<div className='space-x-2'>
									<button className='w-5 h-5 rounded-full bg-yellow-500 ring-offset-2 ring-yellow-500 focus:ring-2 transition' />
									<button className='w-5 h-5 rounded-full bg-indigo-500  ring-offset-2 ring-indigo-500 focus:ring-2 transition' />
									<button className='w-5 h-5 rounded-full bg-teal-500  ring-offset-2 ring-teal-500 focus:ring-2 transition' />
								</div>

								<div className='flex items-center space-x-5'>
									<button className='p-2.5 rounded-lg bg-blue-200 flex justify-center items-center w-8 aspect-square  text-xl text-gray-500'>
										-
									</button>
									<span>1</span>
									<button className='p-2.5 rounded-lg bg-blue-200 flex justify-center items-center w-8 aspect-square  text-xl text-gray-500'>
										+
									</button>
								</div>
							</div>
							<div className='flex justify-between items-center'>
								<span className='font-medium text-2xl'>$460</span>
								<button className='bg-blue-500 text-center text-white rounded-lg py-2 px-8 text-xs'>
									Add to cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='flex flex-col space-y-2 p-5'>
				<details className='select-none open:text-white open:bg-indigo-200'>
					<summary className=' cursor-pointer'>What is my fav. food.</summary>
					<span className='selection:bg-indigo-500 selection:text-white'>
						김치
					</span>
				</details>

				<ul className='list-disc'>
					<li>hi</li>
					<li>hi</li>
					<li>hi</li>
				</ul>

				<input
					type='file'
					className=' transition-colors cursor-pointer file:hover:text-purple-400 file:border-0 file:rounded-md file:p-2 file:bg-purple-400'
				/>
			</div>
		</>
	);
};

export default Test;
