import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectNewAlbums, fetchNewAlbum } from "./newAlbumSlice";

import { Carousel } from "antd";
import AlbumCover from "@/components/album-cover";
import ThemeHeaderRCM from "@/components/theme-header-rcm";
import { AlbumWrapper } from "./style";

const NewAlbum = memo(() => {
	const dispatch = useDispatch();
	const newAlbums = useSelector(selectNewAlbums);
	const newAlbumsStatus = useSelector((state) => state.newAlbum.status);

	const pageRef = useRef();
	useEffect(() => {
		if (newAlbumsStatus === "idle") dispatch(fetchNewAlbum());
	}, [dispatch, newAlbumsStatus]);

	return (
		<AlbumWrapper>
			<ThemeHeaderRCM title="新碟上架" />
			<div className="content">
				<button
					className="arrow arrow-left sprite_02"
					onClick={(e) => pageRef.current.prev()}
				></button>
				<div className="album">
					<Carousel dots={false} ref={pageRef}>
						{[0, 1].map((item) => {
							return (
								<div key={item} className="page">
									{newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
										return (
											<AlbumCover
												key={iten.id}
												info={iten}
												size={100}
												width={118}
												bgp="-570px"
											>
												{iten.name}
											</AlbumCover>
										);
									})}
								</div>
							);
						})}
					</Carousel>
				</div>
				<button
					className="arrow arrow-right sprite_02"
					onClick={(e) => pageRef.current.prev()}
				></button>
			</div>
		</AlbumWrapper>
	);
});

export default NewAlbum;
